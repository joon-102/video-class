import { GlobalStyles, CssBaseline, Box, Link, Typography, Button, Divider } from '@mui/joy';
import { DarkModeRounded, KeyboardArrowRight, LightModeRounded } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';

import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import axios from "axios";

const API_URL: any = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, size = 'sm', ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton aria-label="toggle light/dark mode" size={size} variant="outlined" disabled={!mounted} onClick={(event) => { setMode(mode === 'light' ? 'dark' : 'light'); onClick?.(event); }}{...other} >
      {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

export default function Main() {
  const [isLogin, setisLogin] = React.useState(false);

  // async function LogoutSubmit() {
  //   try {
  //     const Request: any = await axios({
  //       url: `${API_URL}/logout`,
  //       method: "POST",
  //       withCredentials: true,
  //     });

  //     if (Request.status === 200) {
  //       window.open('/', '_self')
  //     }
  //   } catch (error) {
  //     console.log("로그아웃 실패")
  //   }
  // }

  React.useEffect(() => {
    async function LoginCheck() {
      try {
        const Request: any = await axios({ url: `${API_URL}/login/success`, method: "GET", withCredentials: true })

        if (Request.status == 200) {
          setisLogin(true)
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    }
    LoginCheck()
  }, [])

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange >
      <CssBaseline />
      <GlobalStyles styles={{ ':root': { '--Form-maxWidth': '800px', '--Transition-duration': '0.4s', } }} />

      <Box sx={(theme) => ({ transition: 'width var(--Transition-duration)', transitionDelay: 'calc(var(--Transition-duration) + 0.1s)', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'flex-end', backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255 255 255 / 0.2)', [theme.getColorSchemeSelector('dark')]: { backgroundColor: 'rgba(19 19 24 / 0.4)', } })}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', width: '100%', px: 2 }} >
          {/* 네이게이션 바 */}
          <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }} >

            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <Typography level="title-lg"><Link to="/" level="h3" underline="none" color="primary" component={RouterLink} >Video Class</Link></Typography>
            </Box>

            <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
              <ColorSchemeToggle size="sm" />

              {isLogin ? (
                <Button size="sm" onClick={function () { window.open('/dashboard', '_self') }} endDecorator={<KeyboardArrowRight />}>대시보드 가기</Button>
              ) : (
                <Button size="sm" onClick={function () { window.open('/login', '_self') }} endDecorator={<KeyboardArrowRight />}>시작 하기</Button>
              )}

            </Box>
          </Box>

          <Divider sx={(theme) => ({ [theme.getColorSchemeSelector('light')]: { color: { xs: '#FFF', md: 'text.tertiary' } } })} />

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', mt: 6, }}  >
            <Box sx={{ maxWidth: '600px' }}>
              <Typography sx={{ mb: 1 }} fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)" fontWeight="lg" color="primary"  > Video Class.</Typography>
              <Typography level="h4" sx={{ mb: 3 }}>    손위운 강의 공유 플랫폼. </Typography>
              <Button size="lg" onClick={() => window.open('/login', '_self')} endDecorator={<KeyboardArrowRight />}>  시작하기</Button>
            </Box>
          </Box>

          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Video Class {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider >
  )
}