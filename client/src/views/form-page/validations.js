const REQUIRED_FIELD = "Required Field"
const LETT_AND_NUM = /^[a-zA-Z0-9 ]*$/;
const NUM_AND_BAR = /^[-0-9]+$/;
const DATE = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19[5-9][0-9]|20[0-1][0-9]|202[0-5])$/;
const FLOAT_NUM = /^-?\d*\.?\d+$/;


export const validations = (gameProps, errors, setErrors) => {
    let newErrors = errors
    //NAME
    if(!gameProps.name) newErrors.name = REQUIRED_FIELD
    else if(gameProps.name.length > 30) newErrors.name = "Must be fewer than 30 characters"
    else if(!LETT_AND_NUM.test(gameProps.name))newErrors.name = "Only letters and numbers"
    else newErrors.name = ""

    //DESCRIPTION
    if(!gameProps.description) newErrors.description = REQUIRED_FIELD
    else if(gameProps.description.length > 30) newErrors.description = "Must be fewer than 30 characters"
    else newErrors.description = ""

    //RELEAS
    if(!gameProps.release) newErrors.release = REQUIRED_FIELD
    else if(gameProps.release.length < 10) newErrors.release = "Must be almost than 10 characters"
    else if(!NUM_AND_BAR.test(gameProps.release))newErrors.release = "Only numbers and - "
    else if(!DATE.test(gameProps.release)) newErrors.release = "Enter a valid date (DD-MM-YYYY)"
    else newErrors.release = ""

    //RATING
    if(!gameProps.rating) newErrors.rating = REQUIRED_FIELD
    else if(gameProps.rating < 0) newErrors.rating = "Must be fewet than 0"
    else if(gameProps.rating > 5.0) newErrors.rating = "Must be lower than 5"
    else if(!FLOAT_NUM.test(gameProps.rating))newErrors.rating = "Only Decimal"
    else newErrors.rating = ""

    //IMAGE
    var format = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']

    if(!gameProps.image) newErrors.image = REQUIRED_FIELD
    else if(!format.includes(gameProps.image.type)) newErrors.image = "Please select a valid image file (JPEG, PNG, GIF, BMP, WEBP, etc.)"
    else newErrors.image = ""

    //PLATFORMS & GENRES
    if (gameProps.platforms.length < 1) newErrors.platforms = "Select almost one platform"
    else newErrors.platforms = ""

    if (gameProps.genres.length < 1) newErrors.genres = "Select almost one genre"
    else newErrors.genres = ""

    setErrors(newErrors)
}