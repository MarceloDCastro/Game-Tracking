import React, { memo, useEffect } from 'react'
import { Alert, Slide, SlideProps, Snackbar } from '@mui/material'

interface IAlertComponentProps {
    type?: 'success'|'error'|'warning'|'info';
    message: string;
    showAlert: boolean;
    setShowAlert: (state: boolean) => void;
}

function AlertComponent ({ type, message, showAlert, setShowAlert }: IAlertComponentProps) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setShowAlert(false)
  }

  function SlideTransition (props: SlideProps) {
    return <Slide {...props} direction="down" />
  }

  return (
    <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert severity={type} variant="filled" onClose={handleClose}>{message}</Alert>
    </Snackbar>
  )
}

export default memo(AlertComponent)
