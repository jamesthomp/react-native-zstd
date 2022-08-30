import * as React from 'react';

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { compress } from 'react-native-zstd';

export default function App() {
  const [text, setText] = React.useState<string>('Hello !');
  const [result, setResult] = React.useState<string | undefined>();

  const _onChangeText = React.useCallback(async (_text: string) => {
    setText(_text);
    const compressed: Buffer = await compress(_text, 3);
    setResult(compressed.toString('base64'));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput onChangeText={_onChangeText} value={text} />
      <Text>Result (base 64): {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
