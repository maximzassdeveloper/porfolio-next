import { FC } from 'react'
import { Section } from '@/components/hoc'
import { Arrow, Title } from '@/components/ui'
import { SocialList } from '@/components'
import { ContactForm } from './ContactForm'
import s from './contact.module.scss'

export const ContactSection: FC = () => {
  return (
    <Section className={s.contact} id='contact' containerClassName={s.container}>

      <div className={s.info}>
        <Title className={s.title} splitText dataScroll>Контакты</Title>

        <SocialList linkClassName={s.link} />

        <Arrow className={s.arrow} dataScroll />
      </div> 

      <ContactForm />

    </Section>
  )
}