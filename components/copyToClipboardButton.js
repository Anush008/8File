import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const CopyToClipboardButton = ({value}) => {
    const link = `http://localhost:3000/${value}`;
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true);
      navigator.clipboard.writeText(link);
    }
    
    return (
        <>
          <Button fullWidth variant='outlined' endIcon={<ContentCopyIcon/>} onClick={handleClick}>{link}</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton