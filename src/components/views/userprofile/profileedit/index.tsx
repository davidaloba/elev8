import React, { useState } from 'react'

import { login, toggleEdit } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { getError } from '@db/error'

import axios from 'axios'
import Cookies from 'js-cookie'

import { Avatar, Container } from '@components'

export const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const [email, setEmail] = useState(user.userInfo.email)
  const [firstName, setFirstName] = useState(user.userInfo.profile.firstName)
  const [lastName, setLastName] = useState(user.userInfo.profile.lastName)
  // TODO: ADD EDIT/UPLOAD AVATAR
  // const [avatar, setAvatar] = useState(user.userInfo.profile.phone)
  const [phone, setPhone] = useState(user.userInfo.profile.phone)
  const [dob, setDob] = useState(user.userInfo.profile.dob)
  const [facebook, setFacebook] = useState(user.userInfo.profile.facebook)
  const [instagram, setInstagram] = useState(user.userInfo.profile.instagram)
  const [twitter, setTwitter] = useState(user.userInfo.profile.twitter)

  const [editPassword, setEditPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      alert('Passwords don\'t match')
      return
    }
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          firstName,
          lastName,
          phone,
          dob,
          facebook,
          instagram,
          twitter,
          email,
          password
        },
        { headers: { authorization: `Bearer ${user.userInfo.token}` } }
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
    <div className='  border rounded-3xl mb-8 p-4 '>
      <div className="flex items-center my-10 justify-center">
        <Avatar src='/avatar.png' type={user.userInfo.userName} width='92' height='92' />
      </div>
      <div className='flex flex-wrap justify-between  border  mb-8 p-4 '>
        <Container>
          <form action="">
          <div>
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
          <div>
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
          <div>
            <label htmlFor="email">Phone Number</label>
            <input
              type='telephone'
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='outlined fullWidth'
            ></input>
          </div>
          <div>
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
          <div>
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
          <div>
            <label htmlFor="email">Twitter</label>
            <input
              type='text'
              name="twitter"
              id="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className='outlined fullWidth'
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type='email'
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='outlined fullWidth'
            ></input>
          </div>
          <div>
            <label htmlFor="email">Date of Birth</label>
            <input
              type='date'
              name="dob"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className='outlined fullWidth'
            ></input>
          </div>
          </form>
        </Container>
        {editPassword &&
          <Container>
            <div>
              <label htmlFor="email">Password</label>
              <input
                type='password'
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
            <div>
              <label htmlFor="email">Confirm Password</label>
              <input
                type='password'
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='outlined fullWidth'
              ></input>
            </div>
          </Container>}
        {!editPassword && <Container>
          <div onClick={() => setEditPassword(true)} className='my-6 cursor-pointer'>[EDIT PASSWORD?]</div>
        </Container>
        }
        <div className=' mt-6 ' >
          <button onClick={submitHandler} type="button" color="primary">Submit</button>
          <div onClick={() => dispatch(toggleEdit())} className='mt-2 cursor-pointer'>[X]</div>
        </div>

      </div>
    </div>

  )
}
