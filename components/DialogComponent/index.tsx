import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ContentCutSharp } from '@mui/icons-material'

interface IDialogComponentProps{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    text?: string;
    content?: React.ReactNode;
    onConfirm?: () => void;
}

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function DialogComponent ({ open, setOpen, title, text, onConfirm, content }: IDialogComponentProps) {
  return (
    <Dialog
        open={open}
        fullWidth
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {
            text &&
            <DialogContentText id="alert-dialog-slide-description">
                {text}
            </DialogContentText>
          }
          {content && content}
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </DialogActions>
    </Dialog>
  )
}
