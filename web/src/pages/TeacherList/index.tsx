import React,{useState, FormEvent} from 'react';


import PageHeader from '../../components/page-header';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Select from '../../components/Select';
import Input from '../../components/Input';

import './styles.css';
import api from '../../services/api';



export default function TeacherList(){
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);


    async function searchTeachers(e: FormEvent){
        e.preventDefault();
       const response = await api.get('classes', {
            params : {
                subject,
                week_day,
                time
            }
        })
        
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                    options={[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Ciencias', label: 'Ciencias'},
                        {value: 'Educação Física', label: 'Educação Física'},
                        {value: 'Física', label: 'Física'},
                        {value: 'Química', label: 'Química'},
                        {value: 'Geografia', label: 'Geografia'},
                        {value: 'História', label: 'História'},
                        {value: 'Portugues', label: 'Portugues'},
                        {value: 'Matemática', label: 'Matemática'},
                    ]}
                    />

                <Select 
                    name="week_day" 
                    label="Dia da semana"
                    value={week_day}
                    onChange={(e) => {setWeekDay(e.target.value)}}
                    options={[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-feira'},
                        {value: '2', label: 'Terça-feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sábado'},
                    ]}
                    />
                    <Input
                    name="time" 
                    label="Hora" 
                    type="time"
                    value={time}
                    onChange={(e) => {setTime(e.target.value)}}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher:Teacher) => (
                    <TeacherItem key={teacher.id} teacher={teacher} />
                ))}

            </main>
        </div>
    );
}