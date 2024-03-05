/**
 * @param {boolean} open - State to control the modal
 */

import { useState } from "react"
import { Dialog, DialogTitle, DialogActions, Box } from '@mui/material'

const Modal = ({ text, title,  callback, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}>
          { text }
      </button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>
        {/* Modal Title */}
        <Box className='flex justify-between border-b-2 h-fit mx-3'>
          <DialogTitle>{title}</DialogTitle>
          <span className="flex justify-center items-center p-2">
            <button
              onClick={handleClose}
              className="h-fit font-bold text-red-500 text-lg hover:text-red-600 hover:scale-105 transition-all duration-200">
                x
            </button>
          </span>
        </Box>
        {/* Main Modal Content */}
        <Box className='m-5'>
          {children}
        </Box>
        {/* Modal Actions */}
        <DialogActions className="border-t-2 h-fit mx-3">
          <div className="flex gap-5 p-3">
            <button 
              className="hover:outline outline-1 outline-gray-500 rounded-md p-2 transition-all duration-200"
              onClick={handleClose}>
                Cancel
            </button>
            <button 
              className="outline outline-1 outline-blue-400 bg-blue-400 rounded-md p-2 transition-all duration-200 hover:bg-blue-600"
              onClick={() => callback() }>
                Done
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal