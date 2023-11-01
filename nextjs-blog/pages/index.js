import Head from 'next/head';
import Script from 'next/script'

export default function Home() {
  const invalidFields = ['sr1', 'd'];

  setTimeout(() => {
    const myEditor = document.getElementById('my-editor');
    myEditor.hasError=true;
    myEditor.invalidFields = invalidFields
    myEditor.addEventListener('onBlurHandler', ()=>{
      console.log('123')
    })
  }, 5000);

  return (
    <>
      <Script src="https://cdn.canvasjs.com/ga/canvasjs.min.js" strategy="beforeInteractive"/>
      <Script src='/main.js'/>
      <Script src='/polyfills.js'/>
      <Script src='/scripts.js'/>

      <my-button color='green'>hello world</my-button>
      <my-editor id='my-editor' expression='"sr1"+1' ></my-editor>
    </>
  );
}
