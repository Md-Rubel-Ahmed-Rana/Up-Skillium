import { IValidationError } from "@/types/error.type";
import Swal from "sweetalert2";

const handleValidationErrors = (response: any) => {
  if (
    response?.error?.status === 400 &&
    response?.error?.data?.message === "Validation Error!"
  ) {
    const errors = (response?.error?.data?.errorMessages ||
      []) as IValidationError[];
    const simplifiedErrors = errors.map((error) => {
      const errorPathFirstLetter = error?.path.slice(0, 1).toUpperCase();
      const errorPathRemain = error?.path.slice(1, error?.path?.length);
      const errorMessageParts = error?.message?.split(" ");
      const errorMessage = `${
        errorPathFirstLetter + errorPathRemain
      } ${errorMessageParts.slice(2, errorMessageParts?.length).join(" ")}`;
      return errorMessage;
    });

    Swal.fire({
      icon: "warning",
      title: "<strong>Validation Errors Detected</strong>",
      position: "center",
      html: `
        <p style="font-size: 1rem; color: #333; margin-bottom: 10px;">
          Please review the following errors and correct your input:
        </p>
        <ul style="text-align: left; font-size: 0.95rem; color: #555;">
          ${
            simplifiedErrors?.length
              ? simplifiedErrors.map((error) => `<li>• ${error}</li>`).join("")
              : "<li>No detailed errors provided.</li>"
          }
        </ul>
      `,
      width: "400px",
      padding: "20px",
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Got it",
      confirmButtonColor: "#d33",
      backdrop: true,
      customClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      timer: 10000,
    });
  } else {
    return;
  }
};

export default handleValidationErrors;
