import mongoose from 'mongoose'

const withdrawalRequestSchema = new mongoose.Schema(
  {
    withdrawalId: { type: String, required: true, unique: true },
    bankName: { type: String, required: true },
    accountName: { type: String, required: true },
    accountNo: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' }
  },
  {
    timestamps: true
  }
)

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    userName: { type: String, required: true, unique: true },
    profile: {
      points: { type: Number, default: 0 },
      saves: { type: Array, default: [] },
      tasks: { type: Array, default: [] },
      paid: { type: Array, default: [] },
      giveaway: { type: Array, default: [] },
      phone: String,
      firstName: String,
      lastName: String,
      avatar: String,
      dob: String,
      facebook: String,
      instagram: String,
      twitter: String
    },
    referral: {
      referralCode: { type: String, required: true, unique: true },
      referrer: { type: String, default: 'elev8Admin' },
      withdrawals: { type: [withdrawalRequestSchema], default: [] },
      totalWithdrawals: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
