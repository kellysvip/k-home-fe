import { styled } from "@mui/material/styles";
import { Link, Card, CardHeader, Stack, Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink } = profile;

  const SOCIALS = [
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#1C9CEA">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#D7336D">
          <InstagramIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;