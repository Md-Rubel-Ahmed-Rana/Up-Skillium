import Stripe from "stripe";
import dotenv from "dotenv";
import { IStripeCheckout } from "./interface";
import { IEnrollment } from "../enrollment/interface";
import { EnrollmentService } from "../enrollment/service";
import config from "@/config/envConfig";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class Service {
  async stripeCheckout(
    items: IStripeCheckout[],
  ): Promise<{ sessionId: string; sessionUrl: string }> {
    const storedData = items.map((item: IStripeCheckout) => {
      if (item?.quantity) {
        item.quantity = item.quantity >= 1 ? item.quantity : 1;
      } else {
        item.quantity = 1;
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.courseName,
          },
          unit_amount: Math.round(item?.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session: any = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: storedData,
      success_url: config.stripe.successUrl,
      cancel_url: config.stripe.cancelUrl,
    });

    return { sessionId: session?.id, sessionUrl: session.url };
  }

  async checkout(items: IStripeCheckout[]): Promise<{ url: string }> {
    await EnrollmentService.isExist(items[0].userId, items[0].courseId);

    const { sessionId, sessionUrl } = await this.stripeCheckout(items);
    const enrollmentData: IEnrollment[] = items.map(
      (item: IStripeCheckout) => ({
        user: item?.userId,
        course: item?.courseId,
        courseName: item?.courseName,
        price: item?.price,
        paymentSessionId: sessionId,
        paymentSessionUrl: sessionUrl,
      }),
    );

    await EnrollmentService.createEnrollment(enrollmentData[0]);

    return { url: sessionUrl };
  }

  async checkoutFromCart(items: IStripeCheckout[]): Promise<{ url: string }> {
    const { sessionId, sessionUrl } = await this.stripeCheckout(items);
    const enrollmentData: IEnrollment[] = items.map(
      (item: IStripeCheckout) => ({
        user: item?.userId,
        course: item?.courseId,
        courseName: item?.courseName,
        price: item?.price,
        paymentSessionId: sessionId,
        paymentSessionUrl: sessionUrl,
      }),
    );

    await EnrollmentService.createManyEnrollment(enrollmentData);

    return { url: sessionUrl };
  }

  async makePaymentStatusSuccess(sessionId: string) {
    await EnrollmentService.updateStatusAsSuccessByWebhook(sessionId);
  }

  async webHook(event: any) {
    switch (event.type) {
      case "checkout.session.completed":
        const payment = event.data.object;
        const sessionId = payment?.id;
        await this.makePaymentStatusSuccess(sessionId);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
  async webHookCart(event: any) {
    switch (event.type) {
      case "checkout.session.completed":
        const payment = event.data.object;
        console.log({
          from: "Stripe Payment cart webhook",
          data: payment,
        });
        const sessionId = payment?.id;
        await EnrollmentService.updateCartEnrollmentsWebhook(sessionId);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}

export const StripePaymentService = new Service();
