
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ObjectShape } from "yup/lib/object";
import { ArrayPath } from "react-hook-form/dist/types";
import { AsyncDefaultValues, ValidationMode } from "react-hook-form/dist/types/form";
import { DeepPartial, } from "react-hook-form/dist/types/utils";

interface FormProps<T> {
    name: ArrayPath<T>;
    mode?: keyof ValidationMode
    yupSchema: yup.AnyObjectSchema | yup.ObjectSchema<ObjectShape>
    defaultValues?: DeepPartial<T> | AsyncDefaultValues<T>
}

export function useHandleForm<T extends FieldValues>({
    name,
    mode,
    yupSchema,
    defaultValues
}: FormProps<T>){

    const { control, handleSubmit, formState: { errors, isValid }, clearErrors } = useForm<T>({
        resolver: yupResolver(yupSchema),
        mode,
        defaultValues
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name
    })
        
    const dynamicFields = { fields, append, remove, control, handleSubmit, errors, isValid, clearErrors, }

    return dynamicFields
}