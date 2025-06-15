import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  /* New styles for summary mode */
  &.summary-active .summary-text-non-essential {
    text-decoration: line-through;
    color: var(--pink); /* This color was changed from --dark-slate to --navy to make text darker when struck through */
    transition: var(--transition); /* Smooth transition */
  }

  .summary-text-non-essential {
    transition: var(--transition); /* Ensure transition applies when active class is removed too */
  }

  .summary-text-highlight-faded {
    color: var(--dark-slate); /* Light grayish color */
    transition: var(--transition); /* Smooth transition */
  }

  button {
    font-size: var(--fz-xs);
  }
`;

const StyledToggleButton = styled.button`
  position: relative;
  width: 24px;
  height: 14px;
  border-radius: 7px;
  background-color: ${props => (props.active ? 'var(--green)' : 'var(--slate)')};
  border: none;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: ${props => (props.active ? '11px' : '1px')};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--lightest-slate);
    transition: left 0.3s ease;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSummaryMode, setIsSummaryMode] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Namaste! I'm</h1>;
  const two = <h2 className="big-heading">Shivam Baranwal</h2>;
  const three = <h3 className="medium-heading">Product | Analytics | Strategy</h3>;
  const four = (
    <>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <b>Glad to e-meet you!</b>
        <StyledToggleButton
          active={isSummaryMode}
          onClick={() => setIsSummaryMode(!isSummaryMode)}
        />
      </p>

      <p>
        <span className="summary-text-non-essential">I'm a dual-degree student, having completed my{' '}
        </span>
        <span className="summary-text-highlight-faded">B.Tech</span>
        <span className="summary-text-non-essential"> in </span>
        <span className="summary-text-highlight-faded">Computer Science</span>
        <span className="summary-text-non-essential"> and currently pursuing an </span>
        <span className="summary-text-highlight-faded">MBA</span>
        <span className="summary-text-non-essential"> with a major in </span>
        <span className="summary-text-highlight-faded">Marketing</span>
        <span className="summary-text-non-essential"> and a minor in </span>
        <span className="summary-text-highlight-faded">Business Intelligence</span>
        <span className="summary-text-non-essential"> from </span>
        <a href="https://www.nmims.edu/" target="_blank" rel="noopener noreferrer">NMIMS Mumbai</a>.
        <br /><br />
        <span className="summary-text-non-essential">I'm currently </span>
        <span className="summary-text-highlight-faded">exploring</span>
        <span className="summary-text-non-essential"> the field of </span>
        <span className="summary-text-highlight-faded">Product Management</span>
        <span className="summary-text-non-essential"> and am always open to </span>
        <span className="summary-text-highlight-faded">learning</span>, <span className="summary-text-highlight-faded">building</span>, <span className="summary-text-highlight-faded">failing</span>
        <span className="summary-text-non-essential"> because that's where real growth happens. I believe in </span>
        <span className="summary-text-highlight-faded">strong execution</span>
        <span className="summary-text-non-essential"> and in </span>
        <span className="summary-text-non-essential">turning intent into action</span>.
        <span className="summary-text-non-essential"> I'm  </span>
        <span className="summary-text-highlight-faded"> highly organized</span>
        <span className="summary-text-non-essential"> in my work, thrive on structure, and stay focused on driving results. </span>
        <span className="summary-text-non-essential"> I </span>
        <span className="summary-text-highlight-faded">adapt quickly</span>,
        <span className="summary-text-non-essential"> not just in mindset </span>
        
        <span className="summary-text-non-essential"> but in </span>
        <span className="summary-text-highlight-faded">applying</span>
        <span className="summary-text-non-essential"> the </span>
        <span className="summary-text-highlight-faded">right tools</span>
        <span className="summary-text-non-essential"> and </span>
        <span className="summary-text-highlight-faded">skills</span>
        <span className="summary-text-non-essential"> to fit the situation.</span>
      </p>

      
    </>
  );
  const five = (null);

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection className={isSummaryMode ? 'summary-active' : ''}>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
