import { Types } from "mongoose";
import { IStripeCheckout } from "../stripe-payment/interface";
import { StripePaymentService } from "../stripe-payment/service";
import { ICart } from "./interface";
import { Cart } from "./model";

class Service {
  async addToCart(data: ICart): Promise<void> {
    await Cart.create(data);
  }

  async getAllCart(): Promise<ICart[]> {
    return await Cart.find({}).populate("user", "-password").populate("course");
  }

  async getUserCart(userId: string): Promise<ICart[]> {
    return await Cart.find({ user: userId }).populate("course");
  }

  async removeFromCart(cartId: string): Promise<void> {
    await Cart.findByIdAndDelete(cartId);
  }

  async checkout(userId: string): Promise<{ url: string }> {
    const cartItems = await Cart.find({ user: userId }).populate("course");

    if (!cartItems.length) {
      throw new Error("Cart is empty");
    }

    const payload: IStripeCheckout[] = cartItems.map((item) => {
      const course = item.course as any;
      return {
        userId: new Types.ObjectId(userId),
        courseId: course._id,
        courseName: course.title,
        price: course.price.salePrice,
        quantity: 1,
      };
    });

    const { url } = await StripePaymentService.checkoutFromCart(payload);

    await Cart.deleteMany({ user: userId });

    return { url };
  }
}

export const CartService = new Service();
