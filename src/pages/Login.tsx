import { GlobalStyles, CssBaseline, Box, Button, Checkbox, Divider, FormControl, FormLabel, Link, Input, Typography, Stack, Modal, CircularProgress } from '@mui/joy';
import { DarkModeRounded, LightModeRounded , Done  } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';

import { Link as RouterLink } from 'react-router-dom';
import { useCountUp } from 'use-count-up';
import * as React from 'react';
import axios from "axios";

const API_URL: any = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton aria-label="toggle light/dark mode" size="sm" variant="outlined" disabled={!mounted} onClick={(event) => { setMode(mode === 'light' ? 'dark' : 'light'); onClick?.(event); }}{...other} >
      {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

export default function Login() {
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertVisibleValue, setAlertVisibleValue] = React.useState('알 수 없는 오류가 발생했습니다');
  const [loginSuccessModalVisible, setLoginSuccessModalVisible] = React.useState(false);


  const { value: CountValue } = useCountUp({
    isCounting: loginSuccessModalVisible,
    duration: 0.8,
    start: 0,
    end: 100,
  });

  async function LoginSubmit(event: any) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.currentTarget.elements.email.value)) {
      setAlertVisible(true);
      return setAlertVisibleValue('유효한 이메일을 입력하세요.');
    }

    if (event.currentTarget.elements.password.value.length <= 8) {
      setAlertVisible(true);
      return setAlertVisibleValue('비밀번호는 최소 8자 이상이어야 합니다.');
    }

    try {
      const Request: any = await axios({
        url: `${API_URL}/login`,
        method: "POST",
        withCredentials: true,
        data: {
          email: event.currentTarget.elements.email.value,
          password: event.currentTarget.elements.password.value,
          persistent: event.currentTarget.elements.persistent.checked
        },
      });
      if (Request.status === 200) {
        setLoginSuccessModalVisible(true)

        setTimeout(() => {
          window.open('/', '_self')
        }, 800);
      }
    } catch (error: any) {
      setAlertVisible(true)
      if (error.response?.status == 403) {
        setAlertVisibleValue('이메일 또는 비밀번호를 잘못 입력하셨습니다.')
      } else if (error.response?.status == 429) {
        setAlertVisibleValue('요청이 너무 빈번합니다. 잠시 후 다시 시도해 주세요')
      }

    }
  }

  React.useEffect(() => {
    async function LoginCheck() {
      try {
        const Request: any = await axios({ url: `${API_URL}/login/success`, method: "GET", withCredentials: true , headers: {'cors-proxy-url' : 'https://video-class-api.vercel.app/' }, })

        if (Request.status == 200) {
          window.open('/', '_self')
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
              <Typography level="title-lg"><Link to="/" underline="none" color="primary" component={RouterLink} >Video Class</Link></Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Divider sx={(theme) => ({ [theme.getColorSchemeSelector('light')]: { color: { xs: '#FFF', md: 'text.tertiary' } } })} />
          <Box component="main" sx={{ my: 'auto', py: 2, pb: 5, display: 'flex', flexDirection: 'column', gap: 2, width: 400, maxWidth: '100%', mx: 'auto', borderRadius: 'sm', '& form': { display: 'flex', flexDirection: 'column', gap: 2, }, [`& .MuiFormLabel-asterisk`]: { visibility: 'hidden', }, }}>
            <Stack gap={4} sx={{ mb: 1.2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h2">로그인 </Typography>
                <Typography level="body-sm">계정이 없으신가요?{' '} <Link href="#replace-with-a-link" level="title-sm">  회원가입</Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={(theme) => ({ [theme.getColorSchemeSelector('light')]: { color: { xs: '#FFF', md: 'text.tertiary' } } })} />
            {/* form */}
            <Stack gap={4} sx={{ mt: 1 }}>
              <form onSubmit={LoginSubmit} >
                <FormControl required>
                  <FormLabel>이메일</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>비밀번호</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                {/* 로그인 실패 */}
                {alertVisible && (<Typography color="danger" level="body-md" noWrap={false}> {alertVisibleValue} </Typography>)}
                <Stack gap={4} sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Checkbox size="sm" label="자동 로그인" name="persistent" />
                    <Link level="title-sm" href="#아잉">비밀번호를 잊어 버리셨나요?</Link>
                  </Box>
                  <Button type="submit" fullWidth>로그인</Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          {/* footer */}
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Video Class {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 로그인 성공 모달 */}
      <Modal open={loginSuccessModalVisible} onClose={() => setLoginSuccessModalVisible(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
          <Stack spacing={2}>
            <CircularProgress size="lg" determinate value={CountValue as number}>
              {Number(CountValue) >= 97 ? (
                <Done />
              ) : (
                <Typography>{CountValue}%</Typography>
              )}
            </CircularProgress>
          </Stack>

        </Stack>
      </Modal>

    </CssVarsProvider>
  );
}