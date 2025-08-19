import { cn } from '@/lib/utils';
export function Button({ className='', ...props }){ return <button className={cn('btn', className)} {...props}/> }
export function GoldButton(props){ return <Button className='btn-gold' {...props}/> }
export function DarkButton(props){ return <Button className='btn-dark' {...props}/> }
export function GhostButton(props){ return <Button className='btn-ghost' {...props}/> }
