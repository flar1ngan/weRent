import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/FormButton';
import FormContainer from '@/components/form/FormContainer';

const signupAction = async (prevState:unknown, formData:FormData) => {
    "use server"
    const firstName = formData.get("firstName") as string;
    console.log(firstName)
    return {message:"Konts ir izveidots"}
}

function SignUpPage() {
  return <section>
    <h1 className='capitalize text-2xl font-semibold mb-8'>Jauns konts</h1>
    <div className='border p-8 rounded-md max-w-lg'>
        <FormContainer action={signupAction}>
            <div className='grid gap-4 mt-4'>
            <FormInput type='text' name='firstName' label='Vārds' />
            <FormInput type='text' name='lastName' label='Uzvārds' />
            <FormInput type='text' name='username' label='Lietotājvārds' />
            </div>
            <SubmitButton text='Izveidot kontu' className='mt-8' />
        </FormContainer>
    </div>
  </section>
}

export default SignUpPage