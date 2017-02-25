import React from 'react'
import ParallaxCard from '../../src/ParallaxCard'

const Demo = (props) => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem 0',
      width: '100%',
      minHeight: '100%',
      background: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Noto", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", Helvetica, Arial, sans-serif'
    },
    heading: {
      margin: '2rem 0 1.5rem',
      fontSize: '2rem',
      lineHeight: '2rem',
      fontWeight: 'normal',
      textDecoration: 'none',
      color: '#333'
    },
    codeSampleWrapper: {
      margin: 0,
      padding: '1rem',
      minWidth: '90vw',
      background: '#efefef'
    },
    codeSample: {
      margin: 0,
      padding: 0
    }
  }

  return (
    <div style={styles.wrapper}>
      <ParallaxCard
        enableRotate
        style={{ margin: '0 auto', width: '40vw' }}>

        <img src={require('./nasa-80968.jpg')} role='presentation' style={{ maxWidth: '100%', maxHeight: '100%' }} />
        <div />
        <div />
        <div />
        <img src={require('./spacewalks-153581_960_720.png')} role='presentation' style={{ display: 'block', width: 314, height: 360, margin: '-180px -157px', top: '67%', left: '75%' }} />
        <p style={{ fontSize: '3rem', fontWeight: 'bold', padding: '3rem' }}>
          Javascript!
        </p>

      </ParallaxCard>
      <h1>
        <a style={styles.heading} href='https://github.com/theopak/react-parallax-card'>
          <svg height='24' width='24' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fillRule='evenodd' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'></path></svg>
          {' '}
          react-parallax-card
        </a>
      </h1>
      <pre style={styles.codeSampleWrapper}>
        <code style={styles.codeSample} className='language-jsx'>
          {/* eslint-disable react/jsx-indent */}
{`import ParallaxCard from 'react-parallax-card'

<ParallaxCard
  label='Label (optional)'
  enableRotate
  enableTransform
  style={{ margin: '0 auto', width: 240, height: 240 }}>

  <img src='space.jpg' style={{ maxWidth: '100%', maxHeight: '100%' }} />

  <div /><div /><div />

  <img src='astronaut.png' style={{ top: '67%', left: '75%' }} />

  <p style={{ fontSize: '3rem', fontWeight: 'bold', padding: '3rem' }}>
    Javascript!
  </p>

</ParallaxCard>`}
          {/* eslint-enable react/jsx-indent */}
        </code>
      </pre>
    </div>
  )
}

export default Demo
