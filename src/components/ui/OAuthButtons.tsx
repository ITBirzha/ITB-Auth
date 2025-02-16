import { Button } from '@/components/ui/lib/button.tsx'

import { GoogleIcon } from '@/components/icons/GoogleIcon.tsx'
import { GitHubIcon } from '@/components/icons/GitHubIcon.tsx'

export const OAuthButtons = () => {
  return (
    <div className='flex w-full gap-2'>
      <Button
        variant='outline'
        className='flex-1 flex items-center justify-center'
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        variant='outline'
        className='flex-1 flex items-center justify-center'
      >
        <GitHubIcon />
        GitHub
      </Button>
    </div>
  )
}
