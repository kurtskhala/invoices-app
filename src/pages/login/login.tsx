import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (fieldValues: unknown) => {
    console.log(fieldValues);
  };

  return (
    <Card>
      <CardHeader className="space-y-2 mb-2">
        <CardTitle className="text-center text-2xl dark:text-white">
          Log In
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'email-required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'email-invalid',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            console.log(error);
            return (
              <>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={value}
                  onChange={onChange}
                  style={{
                    outline: 'none',
                    boxShadow: 'none',
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'password-required',
            minLength: {
              value: 8,
              message: 'password-min-length 8',
            },
            maxLength: {
              value: 50,
              message: 'password-max-length 50',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            console.log(error);
            return (
              <>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={value}
                  onChange={onChange}
                  style={{
                    outline: 'none',
                    boxShadow: 'none',
                  }}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </>
            );
          }}
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Log In
        </Button>
      </form>
    </Card>
  );
};

export default Login;
