/* globals location */
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from 'rmwc/Card';
import IconButton from 'rmwc/IconButton';

import { Typography } from 'rmwc/Typography';

import FromNow from '../dates/from-now';
import extractUserEmail from '../../utilities/user/extract-user-email';
import extractUserPhotoUrl from '../../utilities/user/extract-user-photo-url';
import createLink from '../../utilities/create-link';
import copyToClipboard from '../../utilities/copy-to-clipboard';

import './card.css';
import '@material/card/dist/mdc.card.min.css';

export default ({ adminTabIndex, environment, user }) => {
  const email = extractUserEmail(user);
  const photoURL = extractUserPhotoUrl(user);
  const userLink = createLink(`${location.origin}${location.pathname}`, {
    adminTabIndex,
    detailUserId: user.__id,
  });

  return (
    <Card style={{ width: 'var(--card-width)', maxWidth: 'var(--card-max-width)' }}>
      <CardPrimaryAction>
        <CardMedia
          sixteenByNine
          style={{
            backgroundImage: `url(${photoURL})`,
          }}
        />
        <section>
          <Typography use="subtitle2" tag="h3" theme="text-secondary-on-background">
            {email}
          </Typography>
        </section>

        <section>
          <Typography
            use="subtitle3"
            tag="h4"
            theme="text-secondary-on-background"
            style={{ marginTop: '1rem' }}
          >
            User Claims
          </Typography>
          <Claims claims={user.claims} />
        </section>

        <section>
          <div className="row">
            <strong>Creation:</strong>
            <span>{user.creationTime}</span>
          </div>
          <div className="row">
            <strong>Last sign in:</strong>
            <FromNow datetime={user.lastSignInTime} />
          </div>
          <div className="row">
            <strong>Verification:</strong>
            <span>{user.emailVerified ? 'verified' : 'unverified'}</span>
          </div>
          <div className="row">
            <strong>Messages:</strong>
            <Link href={`/admin/messages?detailUserId=${user.__id}`} prefetch>
              <a>
                <IconButton use="arrow_forward" />
              </a>
            </Link>
          </div>
        </section>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <CardAction>
            <a
              href={`https://console.firebase.google.com/project/${
                environment.firebase.projectId
              }/database/firestore/data~2Fusers~${user.__id}`}
              target="_blank"
            >
              Record
            </a>
          </CardAction>
        </CardActionButtons>
        <CardActionIcons>
          <CardAction use="share" onClick={handleShareClick(userLink)} />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

function Claims({ claims }) {
  return claims ? (
    <ul>
      {Object.keys(claims).map(claim => (
        <li key={claim}>{claim}</li>
      ))}
    </ul>
  ) : null;
}

function handleShareClick(userLink) {
  return () => copyToClipboard(userLink);
}
