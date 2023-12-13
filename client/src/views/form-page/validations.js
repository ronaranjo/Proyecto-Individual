const REQUIRED_FIELD = "Required Field"

export const validations = (gameProps, errors, setErrors) => {
    let newErrors = errors

    if(!newErrors.name) newErrors.name = REQUIRED_FIELD
}