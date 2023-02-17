
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ObjectShape } from "yup/lib/object";
import { ArrayPath } from "react-hook-form/dist/types";

interface FormProps<T> {
    name: ArrayPath<T>;
    yupSchema: yup.AnyObjectSchema | yup.ObjectSchema<ObjectShape>
}

export function useHandleForm<T extends FieldValues>({
    name,
    yupSchema
}: FormProps<T>){

    const { control, handleSubmit, formState: { errors, isValid }, clearErrors } = useForm<T>({
        resolver: yupResolver(yupSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name
    })
        
    const dynamicFields = { fields, append, remove, control, handleSubmit, errors, isValid, clearErrors, }

    return dynamicFields
}