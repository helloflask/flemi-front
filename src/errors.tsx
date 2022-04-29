export const FieldError = (props: {message?: string, id?: string}) => {
    return <div className="text-sm text-red-600" style={{ marginLeft: "16px" }}>{props.message ? props.message : ""}</div>
};
export const FormError = FieldError;
