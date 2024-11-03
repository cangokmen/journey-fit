import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

export default function IndexScreen() {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [message0, setMessage0] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const [message4, setMessage4] = useState('');
  const [message5, setMessage5] = useState('');
  const [message6, setMessage6] = useState('');
  const [message7, setMessage7] = useState('');
  const [message8, setMessage8] = useState('');
  const [message9, setMessage9] = useState('');
  const [message10, setMessage10] = useState('');
  const [message11, setMessage11] = useState('');
  const [message12, setMessage12] = useState('');
  const [message13, setMessage13] = useState('');
  const [message14, setMessage14] = useState('');
  const [message15, setMessage15] = useState('');
  const [message16, setMessage16] = useState('');
  const [message17, setMessage17] = useState('');
  const [message18, setMessage18] = useState('');
  const [message19, setMessage19] = useState('');
  const [message20, setMessage20] = useState('');

  // Define message states up to message20 if needed

  useFocusEffect(
    useCallback(() => {
      const loadDataFromSecureStore = async () => {
        try {
          const value = await SecureStore.getItemAsync('inputDataArray');
          if (value) {
            const dataArray = JSON.parse(value);
            if (Array.isArray(dataArray) && dataArray.length > 0) {
              const dates = dataArray.map(subArray => {
                const [year, month, day] = subArray[0].split('-');
                return `${month}/${day}`;
              });
              const weights = dataArray.map(subArray => parseFloat(subArray[1]));
              const lastFiveDates = dates.slice(-7);
              const lastFiveWeights = weights.slice(-7);

              setChartData({ labels: lastFiveDates, data: lastFiveWeights });

              let count = 0;

              if (
                count < 3 &&
                dataArray.slice(-5).every(subArray => parseInt(subArray[2]) > 7 && parseInt(subArray[3]) > 7) && 
                parseFloat(dataArray[dataArray.length - 1][1]) > parseFloat(dataArray[dataArray.length - 2][1])
              ) {
                setMessage0("Reaching out to professionals can be a great step—they can help clarify any misconceptions you might have.");
                count++;
              } else {
                setMessage0('');
              }  

              if (count < 3 && dataArray.slice(-5).every(subArray => parseInt(subArray[3]) > 6)) {
                setMessage2("Congrats, you have been very consistent with your physical activity! Try pushing your limits tomorrow!");
                count++;
              } else {
                setMessage2('');
              }

              if (count < 3 && (parseInt(dataArray[dataArray.length - 1][3]) > 7 && parseInt(dataArray[dataArray.length - 1][2]) < 5) || parseInt(dataArray[dataArray.length - 1][2]) < 3) {
                setMessage3("Your body needs energy! Try adding protein/carbohydrates to your meals!");
                count++;
              }
              else {
                setMessage3('');
              }

              if (count < 3 && weights.slice(-4).every((w, i, arr) => i === 0 || w > arr[i - 1]) && parseInt(dataArray[dataArray.length - 1][2]) < 5) {
                setMessage4("Focus more on your meals. Eating habits are the most important thing when it comes to weight loss!");
                count++;
              }
              else {
                setMessage4('');
              }

              if (count < 3 && parseInt(dataArray[dataArray.length - 1][3]) > 9 && parseInt(dataArray[dataArray.length - 1][4]) < 3) {
                setMessage5("Your physical activity might be too heavy. Try being gentle on your body and enjoy the activity!");
                count++;
              }
              else {
                setMessage5('');
              }

              if (count < 3 && dataArray.slice(-7).every((_, i) => i === 0 || parseInt(dataArray[i][3]) > parseInt(dataArray[i - 1][3]))) {
                setMessage12("Your activity levels are climbing steadily—fantastic! Keep challenging yourself, but remember to rest when needed.");
                count++;
              }
              else {
                setMessage12('');
              }

              if (count < 3 && dataArray.slice(-5).every(subArray => parseInt(subArray[4]) < 5) && parseInt(dataArray[dataArray.length - 1][3]) > 5) {
                setMessage14("Your activity level is impressive, but don’t forget to check in with your well-being. Consider a relaxing day to recharge.");
                count++;
              }
              else {
                setMessage14('');
              }

              if (count < 3 && dataArray.slice(-3).every(subArray => parseInt(subArray[2]) < 4 && parseInt(subArray[4]) < 4)) {
                setMessage15("Feeling a bit low? Sometimes focusing on nutrient-rich meals can boost your mood and energy. Small adjustments can make a big difference!");
                count++;
              }
              else {
                setMessage15('');
              }

              if (count < 3 && weights[weights.length - 1] < weights[weights.length - 7] && dataArray.slice(-7).every((_, i) => i === 0 || parseInt(dataArray[i][2]) > parseInt(dataArray[i - 1][2]) && parseInt(dataArray[i][3]) > parseInt(dataArray[i - 1][3]))) {
                setMessage16("Balanced growth in all areas is key! Keep nurturing your body with both movement and healthy meals—it's a winning combination.");
                count++;
              }
              else {
                setMessage16('');
              }

              if (count < 3 && weights.slice(-7).every((_, i, arr) => arr[i] === arr[0]) && dataArray.slice(-7).every(subArray => parseInt(subArray[2]) > 7)) {
                setMessage17("Stability in weight with strong nutrition is a positive sign. Keep up the balanced meals, and consider trying new activities if you're up for it!");
                count++;
              }
              else {
                setMessage17('');
              }

              if (count < 3 && dataArray.slice(-4).every(subArray => parseInt(subArray[4]) < 4)) {
                setMessage18("Your mental and physical energy might be dipping. Try focusing on self-care and rest to rejuvenate your well-being!");
                count++;
              }
              else {
                setMessage18('');
              }

              if (count < 3 && parseInt(dataArray[dataArray.length - 1][3]) < 3 && dataArray.slice(-4).every((_, i) => i === 0 || parseInt(dataArray[i - 1][3]) > 7)) {
                setMessage19("Taking a break is totally okay! A day of rest now can keep you energized for more active days ahead.");
                count++;
              }
              else {
                setMessage19('');
              }

              if (count < 3 && weights.slice(-5).every((_, i, arr) => arr[i] === arr[0]) && parseInt(dataArray[dataArray.length - 1][2]) > 5 && dataArray.slice(-5).every(subArray => parseInt(subArray[4]) > 6)) {
                setMessage20("Great job maintaining positive habits! Steady weight often signals your body adapting. Keep enjoying your journey!");
                count++;
              }
              else {
                setMessage20('');
              }

              if (count < 3 && parseInt(dataArray[dataArray.length - 1][3]) > 7 && parseInt(dataArray[dataArray.length - 1][2]) > 7 && weights[weights.length - 1] > weights[weights.length - 2]) {
                setMessage6("The hard days are what make you STRONGER. Keep going!");
                count++;
              }
              else {
                setMessage6('');
              }

              if (count < 3 && dataArray.slice(-4).every(subArray => parseInt(subArray[3]) < 3)) {
                setMessage7("A small effort each day makes a big difference! Try to add a little more movement to your routine.");
                count++;
              }
              else {
                setMessage7('');
              }

              if (count < 3 && dataArray.slice(-3).every((_, i) => i === 0 || parseInt(dataArray[i][2]) > parseInt(dataArray[i - 1][2]))) {
                setMessage8("Great job with your meals! Consistent nutrition fuels your journey—keep it up!");
                count++;
              }
              else {
                setMessage8('');
              }

              if (count < 3 && weights.slice(-3).every((w, i, arr) => i === 0 || w === arr[i - 1]) && parseInt(dataArray[dataArray.length - 1][3]) < 5) {
                setMessage9("Every step counts! Try incorporating small movement breaks to reach your goals faster.");
                count++;
              }
              else {
                setMessage9('');
              }

              if (count < 3 && parseInt(dataArray[dataArray.length - 1][2]) > 6 && parseInt(dataArray[dataArray.length - 1][3]) < 3) {
                setMessage10("Excellent focus on nutrition! Adding some light physical activity could amplify results.");
                count++;
              }
              else {
                setMessage10('');
              }

              if (count < 3 && weights[weights.length - 1] < weights[weights.length - 2] && parseInt(dataArray[dataArray.length - 1][2]) > 5 && parseInt(dataArray[dataArray.length - 1][3]) > 5) {
                setMessage11("Amazing results! Your balanced focus on activity and nutrition is paying off!");
                count++;
              }
              else {
                setMessage11('');
              }

              if (count < 3 && dataArray.slice(-5).every(subArray => parseInt(subArray[2]) >= 8)) {
                setMessage13("Amazing focus on nutrition! Maintaining a balanced diet consistently is a huge achievement. Keep it up!");
                count++;
              }
              else {
                setMessage13('');
              }

              if (count < 3 && parseInt(dataArray[dataArray.length - 1][3]) === 1) {
                setMessage1("At least try to walk 10 minutes daily!");
                count++;
              } else {
                setMessage1('');
              }
            }
          }
        } catch (error) {
          console.log('Error loading data from SecureStore', error);
        }
      };

      loadDataFromSecureStore();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>JourneyFit</Text>
      {chartData.data.length > 0 && (
        <>
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  data: chartData.data,
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.9}
            height={270}
            chartConfig={{
              backgroundColor: '#00BF63',
              backgroundGradientFrom: '#00BF63',
              backgroundGradientTo: '#00BF63',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 36,
              },
              propsForDots: {
                r: '8',
                strokeWidth: '3',
                stroke: '#00BF63',
              },
              propsForLabels: {
                fontWeight: 'bold',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 0,
            }}
          />
          <View style={styles.buffer} />
        </>
      )}
      {[message0, message1, message2, message3, message4, message5, message6, message7, message8, message9, message10,
        message11, message12, message13, message14, message15, message16, message17, message18, message19, message20
      ].map(
        (message, index) =>
          message !== '' && (
            <View key={index} style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  buffer: {
    height: 50,
  },
  messageBox: {
    backgroundColor: '#4C91B5',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C91B5',
    marginVertical: 16,
    textAlign: 'center',
  }  
});
