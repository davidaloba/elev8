import { useRef } from 'react'

export const FileUploader = ({ onFileSelectError, onFileSelectSuccess }) => {
  const fileInput = useRef(null)

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    // handle validations
    // if (file.size > 1024) {
    //   onFileSelectError({ error: 'File size cannot exceed more than 1MB' })
    //   return
    // }
    onFileSelectSuccess(file)
  }

  return (

    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
      {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"> </button> */}
    </div>
  )
}
