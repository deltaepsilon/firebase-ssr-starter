/* globals location */
import React from 'react';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from 'rmwc/Card';

import { Typography } from 'rmwc/Typography';

import FromNow from '../dates/from-now';
import extractUserEmail from '../../utilities/user/extract-user-email';
import extractUserPhotoUrl from '../../utilities/user/extract-user-photo-url';
import createLink from '../../utilities/create-link';
import copyToClipboard from '../../utilities/copy-to-clipboard';

import './card.css';
import '@material/card/dist/mdc.card.min.css';

export default ({ environment, user }) => {
  const email = extractUserEmail(user);
  const photoUrl = extractUserPhotoUrl(user);
  const userLink = createLink(location.href, { adminTabIndex: 1, detailUserId: user.__id });

  return (
    <Card style={{ width: '21rem' }}>
      <CardPrimaryAction>
        <CardMedia
          sixteenByNine
          style={{
            backgroundImage: `url(${photoUrl})`,
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
  return claims ? <ul>{Object.keys(claims).map(claim => <li key={claim}>{claim}</li>)}</ul> : null;
}

function handleShareClick(userLink) {
  return () => copyToClipboard(userLink);
}
