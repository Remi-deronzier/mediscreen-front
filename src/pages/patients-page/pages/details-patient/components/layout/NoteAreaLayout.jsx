import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingButton from "../../../../../../components/buttons/LoadingButton";
import { UserContext } from "../../../../../../context/userContext";

export default function NoteAreaLayout({ patientId, defaultValues, submit }) {
  const user = useContext(UserContext);

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const yupSchema = yup.object({
    note: yup
      .string()
      .required("Note is required")
      .max(500, "Max 500 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });

  const { ref, ...rest } = register("note");

  async function submitForm(values) {
    const payload = {
      patientId,
      content: values.note,
    };
    try {
      clearErrors();
      await submit(payload);
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
          alt="Doctor avatar"
        />
      </div>
      <div className="min-w-0 flex-1">
        <form className="relative" onSubmit={handleSubmit(submitForm)}>
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="note" className="sr-only">
              Add your note
            </label>
            <textarea
              {...rest}
              ref={(e) => {
                ref(e);
                textAreaRef.current = e;
              }}
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
              <LoadingButton
                isLoading={isSubmitting}
                label="Add"
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
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
