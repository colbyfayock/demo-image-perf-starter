import { useState } from 'react';

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  const [siteUrl, setSiteUrl] = useState();
  const [error, setError] = useState();

  function handleOnChange() {
    setSiteUrl();
    setError();
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    
    const fields = Array.from(e.currentTarget.elements);
    let url = fields.find(el => el.name === 'url')?.value;

    if ( !url ) {
      setError('Please set a valid URL.');
      return;
    }

    if ( !/^http(s)?:\/\//.test(url) ) {
      url = `https://${url}`;
    }

    setSiteUrl(url);

    await runTests();
  }

  async function runTests() {
    // Run tests here
  }

  return (
    <Layout>
      <Section>
        <Container className={styles.homeContainer}>
          <h1>Test your website!</h1>
          <form className={styles.form} onSubmit={handleOnSubmit}>
            <input className={styles.input} type="text" name="url" onChange={handleOnChange} />
            <Button className={styles.button}>Sign Up</Button>
          </form>
          {siteUrl && <p>Testing { siteUrl }</p>}
          {!siteUrl && !error && <p>Enter your website URL above to get started!</p>}
          {error && <p className={styles.error}>{ error }</p>}
        </Container>
      </Section>
    </Layout>
  )
}