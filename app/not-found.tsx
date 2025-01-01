import { LinkButton } from '@/components/ui/link-button'

export default function NotFoundError() {
  return (
    <div className='h-[70vh]'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Page Not Found!</span>
        <p className='text-center text-muted-foreground'>
          It seems like the page you're looking for <br />
          does not exist or might have been removed.
        </p>
        <div className='mt-6 flex'>
          <LinkButton href='/'>Back to Home</LinkButton>
        </div>
      </div>
    </div>
  )
}
