import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

const CroppedIframe = styled.span`
  width: 225px;
  height: 50px;
  position: relative;
  overflow: hidden;

  iframe {
    position: absolute;
    top: -38px;
    left: -83px;
    width: 500px;
    height: 500px;
    clip: rect(51px 416px 481px 95px);
    filter: invert(100%);
    display: none;
    opacity: 0.5;
    overflow: hidden;
    border: none;
  }
`;

const ToggleButton = styled.span`
  cursor: pointer;
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });
  const [isPromptShowing, setIsPromptShowing] = useState(false);
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/Am-ShivA/portfolio')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  const showCustomPrompt = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPromptShowing) return;

    // If iframe is already visible, just close it without asking password
    if (isIframeVisible) {
      toggleIframe();
      return;
    }
    
    setIsPromptShowing(true);
    const today = new Date();
    const password = today.getDate().toString();
    const userInput = prompt("Well well, look who cracked the code 👀\nNow prove you're worthy... what's the password?");
    
    if (userInput === password) {
      toggleIframe();
    } else if (userInput !== null) {
      alert("Wrong password!");
    }
    setIsPromptShowing(false);
  };

  const toggleIframe = () => {
    const iframe = document.getElementById('my-iframe');
    const newVisibility = !isIframeVisible;
    setIsIframeVisible(newVisibility);
    iframe.style.display = newVisibility ? 'block' : 'none';
  };

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <div>
          <CroppedIframe>
            <iframe id="my-iframe" src="https://sendfileonline.com/" scrolling="no" frameBorder="0" style={{ display: 'none' }}></iframe>
          </CroppedIframe>
          <ToggleButton onClick={showCustomPrompt} style={{ pointerEvents: isPromptShowing ? 'none' : 'auto' }}>&nbsp;&nbsp;&nbsp;&nbsp;🧑🏻‍💻</ToggleButton>
          <a href="https://www.linkedin.com/in/shivam-baranwal-nmims">
            <b>ishiv</b> — because default is boring. <br></br>
          </a>

          {githubInfo.stars && githubInfo.forks && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </div>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
