import React, { Component } from 'react';
import Draggable from 'react-draggable';

const stickers = [
  { url: 'https://stackstickers.shop/images/dino.png' },
  { url: 'https://stackstickers.shop/images/javascript.png' },
  { url: 'https://stackstickers.shop/images/npm.png' },
  { url: 'https://stackstickers.shop/images/angular.png' },
  { url: 'https://stackstickers.shop/images/react.png' },
  { url: 'https://stackstickers.shop/images/vue.png' },
  { url: 'https://stackstickers.shop/images/emotion.png' },
  { url: 'https://stackstickers.shop/images/sass.png' },
  { url: 'https://stackstickers.shop/images/nodejs.png' },
  { url: 'https://stackstickers.shop/images/styled-components.png' },
  { url: 'https://stackstickers.shop/images/webpack.png' },
  { url: 'https://stackstickers.shop/images/redux.png' },
  { url: 'https://stackstickers.shop/images/css.png' },
  { url: 'https://stackstickers.shop/images/yarn.png' },
  { url: 'https://stackstickers.shop/images/graphql.png' },
  { url: 'https://stackstickers.shop/images/preact.png' },
  { url: 'https://stackstickers.shop/images/typescript.png' },
  { url: 'https://stackstickers.shop/images/html.png' },
  { url: 'https://ih1.redbubble.net/image.281754037.2838/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.213498029.1630/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.246611714.0222/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.200517086.1716/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.294054237.6463/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.317673520.2838/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.91883508.9596/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.361919136.3753/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.361921157.3811/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.199188173.6366/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.529903029.3879/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.357283962.8641/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.194102819.4911/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.441997446.7936/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.319480726.6606/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.361911711.3548/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.240125428.9267/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.642082586.0579/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.331019021.5456/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.294023201.8527/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.642081444.0602/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.428914186.0177/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.289285621.2542/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.561330546.9985/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.503964133.7671/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.240125082.9255/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.285088426.9345/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.397565901.9873/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.289553793.9672/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.503953324.7362/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.512419817.3962/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.439213317.4224/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.400854859.2569/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.318854606.8129/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.380752922.8495/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.439198187.3835/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.398734614.2498/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.220329873.9110/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.91918021.1078/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.370345714.1971/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.58958353.7561/sticker,375x375.png' },
  { url: 'https://ih1.redbubble.net/image.500219631.7359/sticker,375x375.png' }
];

class App extends Component {
  state = {
    stickers: stickers,
    selected: []
  };

  handleSelect = url => {
    this.setState(prevState => ({
      selected: [...prevState.selected, { url }]
    }));
  };

  render() {
    const { stickers, selected } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          height: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flex: 0.45,
            height: '100%',
            overflow: 'hidden auto'
          }}
        >
          {stickers.map(x => (
            <div
              key={x.url}
              style={{
                backgroundImage: `url(${x.url})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                height: '80px',
                width: '80px',
                margin: '15px',
                cursor: 'pointer'
              }}
              onClick={() => this.handleSelect(x.url)}
            />
          ))}
        </div>
        <div
          className="teste"
          style={{
            flex: 1,
            height: '100%',
            position: 'relative',
            backgroundColor: 'red'
          }}
        >
          {selected.map(x => (
            <Draggable key={x.url} bounds="parent" handle=".handle">
              <div
                className="handle"
                style={{
                  backgroundImage: `url(${x.url})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '80px',
                  width: '80px'
                }}
              />
            </Draggable>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
