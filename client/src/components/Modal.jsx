/**
 * @desc This component is a modal that can be used to display a message or perform an action. It has a button that opens the modal, a title, and children.
 * @param {boolean} open - State to control the modal
 * @param {function} callback - Function to be called when the modal button is clicked
 * @param {string} type - The type of modal to render
 * @param {string} btnType - The type of button to render
 * @param {string} text - The label of the button
 * @param {string} title - The title of the modal
 * @param {object} children - The children of the modal
 * @returns
 */

import { useState } from "react"
import Button from "./Button";
import { Dialog, DialogTitle, DialogActions, Box } from '@mui/material'

const Modal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        type={props.btnType}
        label={props.text}
        onClick={handleOpen} />
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>
        {/* Modal Title */}
        <Box className='flex justify-between border-b-2 h-fit mx-3'>
          <DialogTitle>{props.title}</DialogTitle>
          <span className="flex justify-center items-center p-2">
            <button
              onClick={handleClose}
              className="h-fit font-bold text-red-500 text-lg hover:text-red-600 hover:scale-105 transition-all duration-200">
                {/* TODO: Add a close icon */}
                x
            </button>
          </span>
        </Box>
        {/* Main Modal Content */}
        <Box className='m-5'>
          {props.children}
        </Box>
        {/* Modal Actions */}
        { props.type === 'confirm' && 
          <DialogActions className="border-t-2 h-fit mx-3">
            <div className="flex gap-5 p-3">
              <Button
                type='secondary'
                label='Cancel'
                onClick={handleClose}/>
              <Button 
                type='primary'
                label='Done'
                onClick={() => props.callback()}/>
            </div>
          </DialogActions>
        }
      </Dialog>
    </div>
  )
}

export default Modal