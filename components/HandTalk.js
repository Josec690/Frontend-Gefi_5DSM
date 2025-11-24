import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * Componente HandTalk - Tradutor de Libras
 * Renderiza um botão flutuante que traduz o conteúdo para Língua Brasileira de Sinais
 * Usa o SDK Hand Talk com avatar Hugo ou Maya
 */
export default function HandTalk() {
  // Token Hand Talk (versão trial pública - substitua pelo seu token comercial)
  const HANDTALK_TOKEN = 'public-trial-token';
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background: transparent;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
          }
          /* Customização do botão Hand Talk */
          #ht-widget-container {
            position: fixed !important;
            bottom: 10px !important;
            right: 10px !important;
            z-index: 999999 !important;
          }
        </style>
      </head>
      <body>
        <!-- Hand Talk Plugin -->
        <div id="ht-widget-container"></div>
        
        <script>
          var ht = document.createElement("script");
          ht.type = "text/javascript";
          ht.async = true;
          ht.src = "https://api.handtalk.me/plugin/latest/handtalk.min.js";
          
          ht.onload = ht.onreadystatechange = function() {
            var rs = this.readyState;
            if (rs && rs !== 'complete' && rs !== 'loaded') return;
            
            try {
              window.ht = new HT({
                token: "${HANDTALK_TOKEN}",
                avatar: "HUGO",  // HUGO (masculino) ou MAYA (feminino)
                align: "bottom right",
                mobileConfig: {
                  align: "bottom right"
                },
                side: "right",
                buttonText: "Libras",
                pageSpeech: true,
                customButtonStyle: {
                  bottom: "20px",
                  right: "20px"
                }
              });
            } catch (e) {
              console.error("Erro ao inicializar Hand Talk:", e);
            }
          };
          
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(ht, s);
          
          // Prevenir zoom e scroll no WebView
          document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
          });
          
          // Comunicação com React Native
          window.ReactNativeWebView = window.ReactNativeWebView || {
            postMessage: function(msg) {
              console.log("Message to RN:", msg);
            }
          };
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        androidLayerType="hardware"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={false}
        originWhitelist={['*']}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        accessible={true}
        accessibilityLabel="Botão Hand Talk - Tradução para Libras"
        accessibilityHint="Toque duas vezes para ativar o tradutor de Língua Brasileira de Sinais com Hugo"
        accessibilityRole="button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    zIndex: 9999,
    pointerEvents: 'box',
  },
  webview: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});
