import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { withFormik, Form, Field } from "formik";

const NewUserForm = ({values, errors, touched, status}) =>{
    const [user, setUser]= useState([])
    useEffect(() => {
        if (status) {
          setUser([...user, status]);
        }
      }, [status]);
    return(
        <div>
        <Form>
            <Field type='text' name='name' placeholder='name'/>
            {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}
            <Field type='text' name='email' placeholder='email'/>
            {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
            <Field type='password' name='password' placeholder='password'/>
            {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
            <label className='checkbox-container'>
                Accept Terms of Service
                <Field
                type="checkbox"
                name="service"
                checked={values.service}
             />
             {touched.service && errors.service && (<p className='error'>{errors.service}</p>)}
            </label>
            <button>Submit!</button>
        </Form>
        {user.map(use => (
            <ul key={use.id}>
              <li>Name:{use.name}</li>
              <li>email: {use.email}</li>
              <li>password: {use.password}</li>
            </ul>
          ))}
    </div>

    )
}
const FormikNewUserForm = withFormik({
    mapPropsToValues({name, email, password, service}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            service: service || false
        };
    },
    validationSchema: Yup.object().shape({
        name:Yup.string().required('You must put a name'),
        email: Yup.string().required(),
        password: Yup.string().required(),
        service: Yup
        .boolean()
        .oneOf([true], 'Must Accept Terms and Conditions')
    }),
    handleSubmit(values, { setStatus }) {
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
          })
          .catch(err => console.log(err.res));
        }
})(NewUserForm)

export {FormikNewUserForm}