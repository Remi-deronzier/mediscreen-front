import Loader from "../loader/Loader";

export default function LoadingButton({
  isLoading,
  label,
  children,
  ...props
}) {
  return isLoading ? (
    <Loader />
  ) : (
    <button {...props} disabled={isLoading}>
      {children}
      {label}
    </button>
  );
}
