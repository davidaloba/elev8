import { useRef, useState } from 'react'

import { login, toggleEdit } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { getError } from '@db/error'

import axios from 'axios'
import Cookies from 'js-cookie'

import Image from 'next/image'
import { Avatar, Container } from '@components'

export const EditProfile = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const [editPassword, setEditPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [previewAvatar, setPreviewAvatar] = useState(user.userInfo.profile.avatar)

  const [avatar, setAvatar] = useState(null)
  const [email, setEmail] = useState(user.userInfo.email || '')
  const [firstName, setFirstName] = useState(user.userInfo.profile.firstName || '')
  const [lastName, setLastName] = useState(user.userInfo.profile.lastName || '')
  const [phone, setPhone] = useState(user.userInfo.profile.phone || '')
  const [dob, setDob] = useState(user.userInfo.profile.dob || '')
  const [facebook, setFacebook] = useState(user.userInfo.profile.facebook || '')
  const [instagram, setInstagram] = useState(user.userInfo.profile.instagram || '')
  const [twitter, setTwitter] = useState(user.userInfo.profile.twitter || '')
  const [password, setPassword] = useState('')

  const changePassword = useRef()
  const pwInput = changePassword.current
  const submitHandler = async () => {
    if (password !== '') {
      if (pwInput.validity.patternMismatch) {
        pwInput.setCustomValidity('Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters')
        alert(pwInput.validationMessage)
        return
      }
    }
    if (password !== confirmPassword) {
      alert('Passwords don\'t match')
      return
    }

    const formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('userName', user.userInfo.userName)
    formData.append('email', email)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('phone', phone)
    formData.append('dob', dob)
    formData.append('facebook', facebook)
    formData.append('instagram', instagram)
    formData.append('twitter', twitter)
    formData.append('password', password)

    try {
      const { data } = await axios.put(
        '/api/users/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${user.userInfo.token}`
          },
          onUploadProgress: (event) => {
            // console.log('Current progress:', Math.round((event.loaded * 100) / event.total))
          }
        }
      )
      dispatch(login(data))
      Cookies.set('userInfo', data)
      dispatch(toggleEdit())
      alert('Profile updated successfully')
    } catch (err) {
      alert(getError(err))
    }
  }

  return (
    <div className='bg-white border rounded-3xl mb-8 py-6 px-10 '>

      <div className='flex flex-wrap justify-between py-4  mb-8 '>
        <Container>
          <div className="flex flex-col items-center my-10 ">
            <div className=" " >
              <div className='absolute '>
              <Image src='/close.png' width='20' height='20' alt='[CLOSE]'
                className='cursor-pointer bg-white z-10 p-6 rounded-full right-1'
                onClick={() => {
                  setAvatar(null)
                  setPreviewAvatar(user.userInfo.profile.avatar || '/avatar.png')
                  document.getElementById('avatar').value = ''
                }}
               />

              </div>
            <Avatar src={previewAvatar || user.userInfo.profile.avatar } alt={user.userInfo.userName} width='100' height='100' />
            </div>
            <label htmlFor="email">Avatar</label>
            <input
              type='file'
              name="avatar"
              id="avatar"
              onChange={(e) => {
                setAvatar(e.target.files[0])
                setPreviewAvatar(URL.createObjectURL(e.target.files[0]))
              }}
              className='outlined fullWidth'
            ></input>

          </div>
          <form action="">
            <div className='my-4'>
              <label htmlFor="email">First Name</label>
              <input
                type='text'
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
            <div className='my-4'>
              <label htmlFor="email">Last Name</label>
              <input
                type='text'
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
            <div className='my-4'>
              <label htmlFor="email">Phone Number</label>
              <input
                type='tel'
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
            <div className='my-4'>
              <label htmlFor="email">Facebook</label>
              <input
                type='text'
                name="facebook"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
            <div className='my-4'>
              <label htmlFor="email">Instagram</label>
              <input
                type='text'
                name="instagram"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
            <div className='my-4'>
              <label htmlFor="email">Twitter</label>
              <input
                type='text'
                name="twitter"
                id="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div >
            <div className='my-4'>
              <label htmlFor="email">Email</label>
              <input
                type='email'
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='outlined fullWidth'
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title='Enter a valid email address'
              ></input>
            </div>
            <div className='my-4'>
              <label htmlFor="email">Date of Birth</label>
              <input
                type='date'
                name="dob"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div >
          </form>
          {editPassword &&
            <form >
              <div className='my-4'>
                <label htmlFor="email">Password</label>
                <input
                  ref={changePassword}
                  type='password'
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='outlined fullWidth'
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                ></input>
              </div>
              <div className='my-4'>
                <label htmlFor="email">Confirm Password</label>
                <input
                  type='password'
                  minLength={6}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='outlined fullWidth'
                ></input>
              </div>
            </form>}
          {!editPassword && <>
            <div onClick={() => setEditPassword(true)} className='my-6 text-green-900 font-bold cursor-pointer hover:underline'>Edit password?</div>
          </>
          }
          <div className=' mt-6 ' >
            <button onClick={submitHandler} className=" cursor-pointer text-xl text-white font-bold  bg-green-600 border-0 py-2 mr-8" >Submit</button>
            <button onClick={() => dispatch(toggleEdit())} className=" cursor-pointer text-xl text-green-700 font-bold bg-white border-green-600 hover:border-green-600 border-2 py-2 ">Cancel</button>
          </div>
        </Container>
      </div>
    </div>

  )
}
