import React, { useState} from 'react';
import { View,ScrollView,Text,TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather, AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';



export default function TeacherList(){
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [subject,setSubject] = useState('');
    const [week_day,setWeekDay] = useState('');
    const [time,setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }
    useFocusEffect(() => {
        loadFavorites();
    })

    function handleFiltersSubmit() {
        loadFavorites();
        api.get('classes',{
            params : {
                    subject,
                    week_day,
                    time
                }
        }).then(response => {
            console.log(response.data);
            setTeachers(response.data)
        });
        setIsFilterVisible(false);   
    }

    function handleIsVisibleFilter() {
        // if(isFilterVisible === true){
        //     setIsFilterVisible(false);
        // }else{
        //     setIsFilterVisible(true);
        // }
        setIsFilterVisible(!isFilterVisible);
    }
    
    return(
        <View style={styles.container}>
            <PageHeader 
            title="Proffys disponíveis" 
            headerRight={(
                <BorderlessButton onPress={handleIsVisibleFilter}>
                    <Feather name="filter" size={20} color="#fff"/>
                </BorderlessButton>
            )}>
               { isFilterVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput 
                    style={styles.input}
                    placeholderTextColor="#c1bccc"
                    placeholder="Qual a matéria?"
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    />
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput 
                            style={styles.input}
                            placeholderTextColor="#c1bccc"
                            placeholder="Qual o dia?"
                            value={week_day}
                            onChangeText={text => setWeekDay(text)}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput 
                            style={styles.input}
                            placeholderTextColor="#c1bccc"
                            placeholder="Qual horário?"
                            value={time}
                            onChangeText={text => setTime(text)}
                            />
                        </View>
                        
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <AntDesign name="search1" size={24} color="#fff" />
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)
                }
            </PageHeader>

            <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}
            >   
                {teachers.map((teacher:Teacher) => (
                    <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>
                ))}
            </ScrollView>
        </View>
    );
}