import { yupResolver } from "@hookform/resolvers/yup";
import country from "country-list-js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

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
    country: yup.string().required("Country is required"),
    streetAddress: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    region: yup.string().required("Region is required"),
    postalCode: yup.string().required("Postal code is required"),
  });

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/patients";
    navigate(path);
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
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      sex: values.sex,
      address:
        values.streetAddress +
        ", " +
        values.city +
        ", " +
        values.region +
        ", " +
        values.postalCode +
        ", " +
        values.country,
      phoneNumber: values.phoneNumber,
    };
    try {
      clearErrors();
      await submit(payload);
      reset(defaultValues);
      routeChange();
    } catch (error) {
      setError("globalError", {
        type: "globalError",
        message: "Something went wrong",
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

            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  {...register("country")}
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {[""].concat(country.names()).map((countryName, index) =>
                    index === 0 ? (
                      <option key={index} disabled value="">
                        Select an option
                      </option>
                    ) : (
                      <option key={index} value={countryName}>
                        {countryName}
                      </option>
                    )
                  )}
                </select>
              </div>
              {errors?.country && (
                <p className="text-sm py-2 text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="col-span-4">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  {...register("streetAddress")}
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.streetAddress && (
                <p className="text-sm py-2 text-red-600">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  {...register("city")}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.city && (
                <p className="text-sm py-2 text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  {...register("region")}
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.region && (
                <p className="text-sm py-2 text-red-600">
                  {errors.region.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  {...register("postalCode")}
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors?.postalCode && (
                <p className="text-sm py-2 text-red-600">
                  {errors.postalCode.message}
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
          onClick={routeChange}
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
