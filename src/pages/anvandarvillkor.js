import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const anvandarvillkor = () => {
  return (
    <Layout>
      <h2>användarvillkor</h2>
      <ol>
        <li>
          Genom att skicka in ett meddelande på vår webbplats godkänner du att
          ditt namn och din e-postadress används internt av oss för att hantera
          och besvara ditt meddelande. Ditt namn och din e-postadress kommer
          inte att publiceras offentligt.
        </li>
        <li>
          Vi värnar om din integritet och följer gällande lagar och
          förordningar, inklusive EU:s dataskyddsförordning (GDPR), när vi
          hanterar dina personuppgifter. Dina personuppgifter kommer endast att
          användas internt och kommer inte att lämnas ut till tredje part utan
          ditt samtycke.
        </li>
        <li>
          Du ansvarar själv för innehållet i ditt meddelande och försäkrar att
          det inte bryter mot lagen eller är kränkande mot någon annan person.
        </li>
        <li>
          Vi förbehåller oss rätten att redigera eller radera ditt meddelande
          utan förvarning om det bryter mot ovanstående villkor.
        </li>
        <li>
          Genom att skicka in ett meddelande på vår webbplats ger du oss också
          rätten att använda ditt namn och din e-postadress för
          marknadsföringssyften. Du kan när som helst begära att vi raderar dina
          uppgifter genom att skicka ett e-postmeddelande till oss.
        </li>
        <li>
          Dessa användarvillkor kan komma att ändras utan förvarning. Vi
          rekommenderar därför att du regelbundet granskar dessa villkor för att
          se till att du förstår dem.
        </li>
      </ol>
    </Layout>
  );
};

export default anvandarvillkor;
