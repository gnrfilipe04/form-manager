export const onlyNumbers = (value: string) => {
    const pattern = new RegExp('^\d{10}$')

    const newValue = pattern.exec(value)
    console.log({ newValue })
    return newValue
}