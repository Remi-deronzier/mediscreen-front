import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ApiContext } from "../../../../../context/apiContext";
import { UserContext } from "../../../../../context/userContext";

export default function NoteArea({ patientId }) {
  const user = useContext(UserContext);
  const { BASE_URL_NOTES_SERVICE: BASE_URL_API } = useContext(ApiContext);

  const yupSchema = yup.object({
    note: yup
      .string()
      .required("Note is required")
      .max(500, "Max 500 characters"),
  });

  const defaultValues = { note: "" };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValue: defaultValues,
    resolver: yupResolver(yupSchema),
  });

  async function submitForm(values) {
    const payload = {
      patientId,
      content: values.note,
    };
    try {
      clearErrors();
      await fetch(`${BASE_URL_API}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      reset(defaultValues);
    } catch (error) {
      setError("globalError", {
        type: "globalError",
        message: "Something went wrong",
      });
    }
  }

  return (
    <div className="flex items-start space-x-4 w-full">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={user.imageUrl}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form className="relative" onSubmit={handleSubmit(submitForm)}>
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="note" className="sr-only">
              Add your note
            </label>
            <textarea
              {...register("note")}
              rows={3}
              name="note"
              id="note"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your note..."
              defaultValue={""}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center"></div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        {errors?.note && (
          <p className="text-sm py-2 text-red-600">{errors.note.message}</p>
        )}
      </div>
    </div>
  );
}
