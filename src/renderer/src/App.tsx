import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App(): JSX.Element {
  const api = (window as any).api;
  const [imgBase68, setImgBase68] = useState("")
  api.on("qr", (_: any, data: any) => {
    setImgBase68(data.qr)
  })
  return (
    <div className="container">
      {/* <Versions></Versions> */}
      <img src={imgBase68} width={"40%"} alt="" />
      <Button>Button</Button>
    </div>
  )
}

export default App
