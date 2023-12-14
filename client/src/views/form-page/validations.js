const REQUIRED_FIELD = "Required Field"

export const validations = (gameProps, errors, setErrors) => {
    let newErrors = errors

    if(!gameProps.name) newErrors.name = REQUIRED_FIELD
    else if(gameProps.name.length > 50) newErrors.name = "Must be fewer than 50 characters"

    if(!gameProps.image) newErrors.image = REQUIRED_FIELD
}