import { Input } from "native-base";
import { Controller } from "react-hook-form";
import { Text, View, HStack, VStack, AddIcon, FlatList, Button, MinusIcon  } from 'native-base'
import * as yup from 'yup'
import { useHandleForm } from "../../hooks/useHandleForm";
import { toMap } from "../../utils/toMap";

type UserProps = {
    name: string;
    age: string;
}

interface ListUserProps {
    users: Array<UserProps>;
}

export function Home(){

    const usersArraySchema = yup.object().shape({
        users: yup.array().of(yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            age: yup.number().required('Idade é obrigatório').min(18, "Deve ser maior de 18 anos")
        }))
    })

    const defaultValues: ListUserProps = { users: [{ name: "", age: ""}]}

    const { 
        fields, 
        append, 
        remove, 
        clearErrors, 
        control, 
        handleSubmit, 
        errors  
    } = useHandleForm<ListUserProps>({ name: 'users', yupSchema: usersArraySchema, defaultValues })

    const handleInputError = (index: number) => {

        const isInvalid = Boolean(errors.users && errors.users[index]?.name?.message)
        const message = errors.users ? errors.users[index]?.name?.message : null

        return {
            isInvalid,
            message
        }
    }

    const onSubmit = (data: ListUserProps) => {

        const { users } = data

        const usersMap = toMap(users, 'name')

        console.log({ usersMap })
    }

    return(
        <VStack 
            space={5} 
            bg={'gray.900'} 
            flex={1} 
            px={'20px'}
            justifyContent='center'
        >
            
            <FlatList
                mt={10}
                maxH={'70%'}
                data={fields}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                    <HStack alignItems={'center'} justifyContent={'space-between'} mt={5}>
                        {fields.length ? <MinusIcon key={'remove'} size={30} onPress={() => remove(fields.length -1)} /> : <View />}
                        <AddIcon key={'add'} size={30} onPress={() => append({ name: "", age: ""})} />
                    </HStack>
                }
                renderItem={({ item, index }) => (
                    <>
                        <Controller
                            control={control}
                            name={`users[${index}].name` as "users"}
                            render={({ field: { onChange, onBlur, value }}) => (
                                
                                <Input
                                    mb={2}
                                    borderColor={!value ? 'gray.600' : 'emerald.500'}
                                    selectionColor={'emerald.500'}  
                                    cursorColor={'emerald.500'}
                                    bgColor={'transparent'}
                                    value={String(value)}
                                    isInvalid={handleInputError(index).isInvalid}
                                    fontSize={'16px'}
                                    placeholder={'Nome'}
                                    placeholderTextColor={'gray.400'} 
                                    onBlur={onBlur}
                                    onSubmitEditing={() => append({ name: "", age: ""})} 
                                    onChangeText={(e) => {
                                        onChange(e)
                                        clearErrors()
                                    }}
                                    color={'gray.200'}
                                    _invalid={{
                                        borderColor: 'error.500',
                                    }}
                                    _focus={{
                                        borderColor: 'emerald.500',
                                    }} 
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name={`users[${index}].age` as "users"}
                            render={({ field: { onChange, onBlur, value }}) => (
                                
                                <Input
                                    mb={2}
                                    borderColor={!value ? 'gray.600' : 'emerald.500'}
                                    selectionColor={'emerald.500'}  
                                    cursorColor={'emerald.500'}
                                    bgColor={'transparent'}
                                    value={String(value)}
                                    isInvalid={handleInputError(index).isInvalid}
                                    fontSize={'16px'}
                                    placeholder={'Idade'}
                                    placeholderTextColor={'gray.400'} 
                                    onBlur={onBlur}
                                    onSubmitEditing={() => append({ name: "", age: ""})} 
                                    onChangeText={(e) => {
                                        onChange(e)
                                        clearErrors()
                                    }}
                                    color={'gray.200'}
                                    _invalid={{
                                        borderColor: 'error.500',
                                    }}
                                    _focus={{
                                        borderColor: 'emerald.500',
                                    }} 
                                />
                            )}
                        />
                        
                        {   
                            handleInputError(index).isInvalid && 
                            <Text color={'error.500'}>{handleInputError(index).message}</Text>
                        }
                    </>
                )}
            />

            <Button
                rounded={'full'} 
                bgColor={'emerald.500'}
                color={''}
                onPress={handleSubmit(onSubmit)}
            >Salvar</Button>

        </VStack>
    )
}