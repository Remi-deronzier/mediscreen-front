import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import PathService from "../../services/PathService";
import { formatDate } from "../../utils/helpers";

export default function PatientForm({ defaultValues, submit }) {
  const yupSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dateOfBirth: yup
      .date()
      .max(new Date(), "Date of birth cannot be in the future")
      .typeError("Please enter a valid date")
      .required("Date of birth is required"),
    sex: yup.string().required("Sex is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    address: yup
      .string()
      .required("Street address is required")
      .test(
        "len",
        "Can't be longer than 50 characters",
        (val) => val.length <= 50
      ),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  let navigate = useNavigate();
  const goToPatientsPage = () => {
    navigate(PathService.patientsPagePath.absolutePath);
  };

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

  async function submitForm(values) {
    const dateOfBirth = formatDate(values.dateOfBirth);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth,
      sex: values.sex,
      address: values.address,
      phoneNumber: values.phoneNumber,
    };
    try {
      clearErrors();
      await submit(payload);
      reset(defaultValues);
      goToPatientsPage();
    } catch (error) {
      const message = error?.message.split(": ")[1];
      setError("globalError", {
        type: "globalError",
        message: message || "Something went wrong",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Patient information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  {...register("firstName")}
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.firstName && (
                <p className="text-sm py-2 text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  {...register("lastName")}
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.lastName && (
                <p className="text-sm py-2 text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of birth
              </label>
              <div className="mt-2">
                <input
                  {...register("dateOfBirth")}
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  autoComplete="bday"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.dateOfBirth && (
                <p className="text-sm py-2 text-red-600">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="sex"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sex
              </label>
              <div className="mt-2">
                <select
                  {...register("sex")}
                  id="sex"
                  name="sex"
                  autoComplete="sex"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled value="">
                    Select an option
                  </option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              {errors?.sex && (
                <p className="text-sm py-2 text-red-600">
                  {errors.sex.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.phoneNumber && (
                <p className="text-sm py-2 text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  {...register("address")}
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.address && (
                <p className="text-sm py-2 text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            {errors.globalError && (
              <div className="col-span-full">
                <p className="text-sm text-right text-red-600">
                  {errors.globalError.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={goToPatientsPage}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isSubmitting}
        >
          Save
        </button>
      </div>
    </form>
  );
}
