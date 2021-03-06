import { FC, useEffect, useRef, useState } from 'react'
import { Container } from '@/components/hoc'
import { Button, CustomLink, NavList } from '@/components/ui'

import { useAppContext } from '@/context/AppContext'
import { useAnimation } from '@/animations'
import { headerAnimations } from './headerAnimation'

import classNames from 'classnames'
import s from './header.module.scss'

export const Header: FC = () => {

  const { locoScroll } = useAppContext()
  const header = useRef<HTMLDivElement>(null)
  const oldY = useRef(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const animations = headerAnimations(s)
  useAnimation(() => {
    animations.logo()
    animations.navLinks()
    animations.button()
    animations.burger()
  })

  const burgerHandler = () => {
    if (isMobileMenuOpen) {
      animations.closeMobileMenu()
      document.documentElement.style.overflowY = 'auto'
    } else {
      animations.openMobileMenu()
      document.documentElement.style.overflowY = 'hidden'
    }
    setIsMobileMenuOpen(prev => !prev)
  }

  // Shown header on scroll up
  const onScroll = (e: any) => {
    if (!header.current) return
    if (e.scroll.y > header.current.offsetHeight && e.scroll.y > oldY.current) {
      header.current.classList.add(s.hidden)
    } else {
      header.current.classList.remove(s.hidden)
    }
    oldY.current = e.scroll.y
  }

  useEffect(() => {
    locoScroll?.on('scroll', onScroll)

    return () => {
      locoScroll?.off('scroll', onScroll)
    }
  }, [locoScroll])

  return <>
    <header className={s.header} ref={header}>
      <Container className={s.container}>

        <div className={s.logo}>
          <CustomLink className={s.link} route='/'>М. Засс</CustomLink>
        </div>

        <nav className={s.menu}>
          <NavList linkClassName={s.link} />
        </nav>

        <Button className={s.button} size='small'>
          <CustomLink hash='#contact' notHoverCursorAnimation>Связаться</CustomLink>
        </Button>

        <span className={s.burger} onClick={burgerHandler} />

      </Container>
    </header>

    <div className={classNames(s.mobile, { [s.active]: isMobileMenuOpen })}>
      <Container className={s.container}>

        <nav className={s.menu}>
          <NavList onLinkClick={burgerHandler} linkClassName={s.link} />
        </nav>

        <Button className={s.button} size='small'>
          <CustomLink hash='#contact' notHoverCursorAnimation>Связаться</CustomLink>
        </Button>

      </Container>
    </div>
  </>
}