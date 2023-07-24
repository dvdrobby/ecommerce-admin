import { UserButton } from "@clerk/nextjs";

export function SetupPage() {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/"></UserButton>    
    </div>
    
  )
}

export default SetupPage