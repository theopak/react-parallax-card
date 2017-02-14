import React from 'react'
import ParallaxCard from './ParallaxCard'

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
        style={{ margin: '0 auto', width: 240, height: 240 }}>
        <img src='https://s3-us-west-1.amazonaws.com/tachyonsio/img/Blonde-Frank_Ocean.jpeg' width='240' role='presentation' />
      </ParallaxCard>
      <h1><a style={styles.heading} href='https://github.com/theopak/react-parallax-card'>react-parallax-card</a></h1>
      <pre style={styles.codeSampleWrapper}>
        <code style={styles.codeSample} className='language-jsx'>
          {/* eslint-disable react/jsx-indent */}
{`<ParallaxCard
  label='Label (optional)'
  enableRotate
  style={{ margin: '0 auto', width: 240, height: 240 }}>
  <img src='frank.jpeg' width='240' />
</ParallaxCard>`}
          {/* eslint-enable react/jsx-indent */}
        </code>
      </pre>
    </div>
  )
}

export default Demo
