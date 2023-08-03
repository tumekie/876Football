import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

// get the current day in the format of the API 'YYYYMMDD'
const date = new Date();
let day = (date.getDate() + 1).toString().padStart(2, '0'); // Adding 1 to get the following day
let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get the correct month index
let year = date.getFullYear().toString();
let fullDate = year.concat(month, day);

// Dictionary to map leagueIds to image paths
const leagueImageMap = {
  '10077222': require('../assets/mexico.png'),
  '10050234': require('../assets/ucl.png'),
  '10078898': require('../assets/ecl.jpeg'),
  '10037429': require('../assets/usa.png'),
  '10047168': require('../assets/usa.png'),
  '10041424': require('../assets/usa.png'),
  '10069418': require('../assets/usa.png'),
  '10041018': require('../assets/romania.png'),
  '10041036': require('../assets/poland.png'),
  '10041369': require('../assets/norway.png'),
  '10041062': require('../assets/sweden.png'),
  '10041006': require('../assets/bulgaria.png'),
  '10041058': require('../assets/denmark.png'),
};
 
const Matches = () => {
  const [fixtures, setFixtures] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(fullDate);

  useEffect(() => {
    if (selectedDate) {
      //console.log("SELECTED DATE:", selectedDate);
      const formattedDate = selectedDate.split('/').join(''); // format the selected date from the user to API format
      //console.log("Formated DATE:", formattedDate);
      fetchFixtures(formattedDate); // Fetch fixtures when the user selects a different date   
    }
  }, [selectedDate]);
  
  const fetchFixtures = async (dateParam) => {
    const options = {
      method: 'GET',
      url: 'https://betsapi2.p.rapidapi.com/v1/bet365/upcoming',
      params: {
        sport_id: '1',
        day: dateParam,
        skip_esports: 'Esoccer',
      },
      headers: {
        'X-RapidAPI-Key': '05731d6e8emsh4479ae2409717dep1c7713jsn1ca3de816712',
        'X-RapidAPI-Host': 'betsapi2.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data.results);
      const filteredFixtures = response.data.results.filter((fixture) =>
        [
          '10037429', '10041424', '10077222', '10069418', '10047168', '10050234', '10078898',
          '10041018', '10041036', '10041369', '10041062', '10041006', '10041058'
        ].includes(fixture.league.id)
      );
      setFixtures(filteredFixtures);
      console.log(filteredFixtures);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
    }
  };

  function handleOnPress () {
    setOpen(!open);
  };

  function handleChange (propDate) {
    setSelectedDate(propDate);
    setOpen(false); // Close the modal after selecting the date
  };  

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={styles.date}>Calendar</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={open}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode='calendar'
              selected={selectedDate}
              onDateChange={handleChange}
            />
            <TouchableOpacity onPress={handleOnPress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {fixtures.map((fixture, index) => (
        <View key={index} style={styles.fixtureContainer}>
          <Text style={styles.fixtureText}>
            {leagueImageMap[fixture.league.id] && (
              <Image source={leagueImageMap[fixture.league.id]} style={styles.image} />
            )}
            {fixture.league.name}
          </Text>
          {fixture.time_status === 1 ? <Text style={styles.live}>LIVE</Text> : null}
          {fixture.time_status === 3 ? <Text style={styles.fixtureText2}>FT</Text> : null}
          <Text style={styles.fixtureText2}>{fixture.home.name}</Text>
          <Text style={styles.fixtureText2}>VS</Text>
          <Text style={styles.fixtureText2}>{fixture.away.name}</Text>
          <Text style={styles.fixtureText2}>{fixture.ss}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// design of the results fetched from the API
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  fixtureContainer: {
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderWidth: 3,
    borderRadius: 10,
    flex: 1,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  live:{
    //backgroundColor: 'lightgreen',
    color: 'lightgreen'
  },
  fixtureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    borderWidth: 1,
    //borderRadius: 10,
    backgroundColor: 'lightgrey',
    width: '100%',
  },
  fixtureText2: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 4,
  },
  image: {
    height: 13,
    width: 13,
  },
  date: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    //backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
  }
});

export default Matches;